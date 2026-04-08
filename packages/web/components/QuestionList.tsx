'use client';

import { trpc } from '../utils/trpc';

export function QuestionList() {
  const { data: questions, isLoading } = trpc.questions.list.useQuery();

  if (isLoading) {
    return <div className="text-center py-8">Loading questions...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Recent Questions</h2>
      {questions?.map((question) => (
        <div
          key={question.id}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
        >
          <h3 className="text-xl font-medium text-blue-600 mb-2">
            {question.title}
          </h3>
          <p className="text-gray-700 mb-4">{question.content}</p>
          <div className="flex gap-4 text-sm text-gray-500">
            <span>👍 {question.votes} votes</span>
            <span>💬 {question.answerCount} answers</span>
            <span>👁️ {question.views} views</span>
          </div>
        </div>
      ))}
    </div>
  );
}
