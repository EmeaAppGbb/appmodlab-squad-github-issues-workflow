import { QuestionList } from '../components/QuestionList';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">DevConnect</h1>
          <p className="text-gray-600 mt-2">Developer Q&A Community</p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <QuestionList />
      </main>
    </div>
  );
}
