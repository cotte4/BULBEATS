import {
  doc,
  getDoc,
  setDoc,
  runTransaction,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Beat } from '../types/beat';
import type { RankedBeat } from '../types/beat';

export async function ensureUser(usernameSlug: string, username: string): Promise<boolean> {
  const userRef = doc(db, 'users', usernameSlug);
  const snap = await getDoc(userRef);
  if (snap.exists()) {
    const data = snap.data();
    if (data.username !== username) return false; // slug taken by different display name
    await setDoc(userRef, { lastSeen: serverTimestamp() }, { merge: true });
    return true;
  }
  await setDoc(userRef, {
    username,
    createdAt: serverTimestamp(),
    lastSeen: serverTimestamp(),
  });
  return true;
}

export async function castVote(
  beat: Beat,
  vote: 'like' | 'dislike',
  usernameSlug: string,
  username: string,
): Promise<void> {
  const beatRef = doc(db, 'beats', beat.videoId);
  const voteRef = doc(db, 'beats', beat.videoId, 'votes', usernameSlug);

  await runTransaction(db, async (tx) => {
    const voteSnap = await tx.get(voteRef);
    const beatSnap = await tx.get(beatRef);

    const existingVote = voteSnap.exists() ? (voteSnap.data().vote as 'like' | 'dislike') : null;

    // Same vote already cast — no-op
    if (existingVote === vote) return;

    // Calculate counter deltas
    let likesDelta = 0;
    let dislikesDelta = 0;

    if (existingVote === null) {
      // New vote
      if (vote === 'like') likesDelta = 1;
      else dislikesDelta = 1;
    } else {
      // Flipping vote
      if (vote === 'like') {
        likesDelta = 1;
        dislikesDelta = -1;
      } else {
        likesDelta = -1;
        dislikesDelta = 1;
      }
    }

    // Upsert beat doc
    const current = beatSnap.exists()
      ? beatSnap.data()
      : { likes: 0, dislikes: 0, netVotes: 0 };

    const newLikes = (current.likes || 0) + likesDelta;
    const newDislikes = (current.dislikes || 0) + dislikesDelta;

    tx.set(
      beatRef,
      {
        videoId: beat.videoId,
        title: beat.title,
        thumbnail: beat.thumbnail,
        channelTitle: beat.channelTitle,
        bpm: beat.bpm ?? null,
        typeBeat: beat.typeBeat ?? null,
        likes: newLikes,
        dislikes: newDislikes,
        netVotes: newLikes - newDislikes,
        lastVoteAt: serverTimestamp(),
        ...(!beatSnap.exists() ? { firstSeenAt: serverTimestamp() } : {}),
      },
      { merge: true },
    );

    // Write vote sub-doc
    tx.set(voteRef, {
      username,
      vote,
      votedAt: serverTimestamp(),
    });
  });
}

export async function getRankedBeats(count = 50): Promise<RankedBeat[]> {
  const q = query(
    collection(db, 'beats'),
    orderBy('netVotes', 'desc'),
    limit(count),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      videoId: data.videoId,
      title: data.title,
      thumbnail: data.thumbnail,
      channelTitle: data.channelTitle,
      bpm: data.bpm ?? undefined,
      typeBeat: data.typeBeat ?? undefined,
      likes: data.likes ?? 0,
      dislikes: data.dislikes ?? 0,
      netVotes: data.netVotes ?? 0,
    } as RankedBeat;
  });
}
