import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

// This file will contain React Query hooks for backend operations
// Currently the backend is empty, so these are placeholder hooks

export function useGetUserProfile() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      if (!actor) return null;
      // TODO: Implement backend call
      // return actor.getUserProfile();
      return null;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetStudyLogs() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['studyLogs'],
    queryFn: async () => {
      if (!actor) return [];
      // TODO: Implement backend call
      // return actor.getStudyLogs();
      return [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetReadinessScore() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['readinessScore'],
    queryFn: async () => {
      if (!actor) return 0;
      // TODO: Implement backend call
      // return actor.getReadinessScore();
      return 0;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateStudyLog() {
  const queryClient = useQueryClient();
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (data: {
      topicId: string;
      timeSpentMinutes: number;
      confidenceRating: number;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      // TODO: Implement backend call
      // return actor.createStudyLog(data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studyLogs'] });
      queryClient.invalidateQueries({ queryKey: ['readinessScore'] });
    },
  });
}

export function useGetMockTests() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['mockTests'],
    queryFn: async () => {
      if (!actor) return [];
      // TODO: Implement backend call
      // return actor.getMockTests();
      return [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRecordMockAttempt() {
  const queryClient = useQueryClient();
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (data: {
      mockId: string;
      score: number;
      accuracy: number;
      timeTaken: number;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      // TODO: Implement backend call
      // return actor.recordMockAttempt(data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mockTests'] });
      queryClient.invalidateQueries({ queryKey: ['readinessScore'] });
    },
  });
}
