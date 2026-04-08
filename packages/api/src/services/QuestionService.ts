interface Question {
  id: string;
  title: string;
  content: string;
  votes: number;
  answerCount: number;
  views: number;
  createdAt: Date;
  author: string;
}

export class QuestionService {
  private questions: Question[] = [
    {
      id: '1',
      title: 'How to implement authentication in Next.js 14?',
      content: 'Looking for best practices for implementing auth in Next.js with App Router.',
      votes: 42,
      answerCount: 7,
      views: 1250,
      createdAt: new Date('2024-01-15'),
      author: 'dev_user1',
    },
    {
      id: '2',
      title: 'Search results show deleted posts',
      content: 'When searching, deleted posts still appear in results. This is a bug.',
      votes: 15,
      answerCount: 2,
      views: 320,
      createdAt: new Date('2024-01-18'),
      author: 'bug_reporter',
    },
    {
      id: '3',
      title: 'Question list page loads slowly with 1000+ posts',
      content: 'Performance issue: the main question list takes 5+ seconds to load.',
      votes: 28,
      answerCount: 5,
      views: 890,
      createdAt: new Date('2024-01-20'),
      author: 'perf_tester',
    },
  ];

  async getQuestions(): Promise<Question[]> {
    return this.questions;
  }

  async searchQuestions(query: string): Promise<Question[]> {
    return this.questions.filter(
      (q) =>
        q.title.toLowerCase().includes(query.toLowerCase()) ||
        q.content.toLowerCase().includes(query.toLowerCase())
    );
  }
}
