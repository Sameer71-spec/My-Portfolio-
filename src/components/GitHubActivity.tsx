import { useEffect, useState } from 'react';
import { Github, Star, ExternalLink, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GitHubRepo } from '../types';

const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: 'quick-temp-mail',
    description: 'A web-based temporary email application demonstrating full-stack development and API integration.',
    html_url: 'https://github.com/Sameer71-spec/quick-temp-mail',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2025-10-15T10:00:00Z',
  },
  {
    id: 2,
    name: 'CareerPilot-AI',
    description: 'An agentic AI career guidance and resume intelligence system powered by LangGraph and ChromaDB.',
    html_url: 'https://github.com/Sameer71-spec',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2025-11-20T14:30:00Z',
  },
  {
    id: 3,
    name: 'ai-smart-assistant',
    description: 'FastAPI and React based conversational AI assistant application.',
    html_url: 'https://github.com/Sameer71-spec',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2025-08-12T09:15:00Z',
  },
  {
    id: 4,
    name: 'crypto-chatbot-llm',
    description: 'LLM-powered conversational interface for cryptocurrency domain explanations.',
    html_url: 'https://github.com/Sameer71-spec',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2025-07-04T12:00:00Z',
  },
  {
    id: 5,
    name: 'ai-learning-platform',
    description: 'AI-assisted educational platform focused on PDF-based learning and quiz generation.',
    html_url: 'https://github.com/Sameer71-spec',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2025-06-18T16:45:00Z',
  },
  {
    id: 6,
    name: 'agentic-ai-workflows',
    description: 'Multi-step autonomous agent architectures and tool-calling implementations.',
    html_url: 'https://github.com/Sameer71-spec',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2025-12-01T11:20:00Z',
  },
];

export function GitHubActivity() {
  const [repos, setRepos] = useState<GitHubRepo[]>(FALLBACK_REPOS);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${PERSONAL_INFO.githubUsername}/repos?sort=updated&per_page=6`
        );
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setRepos(data);
            setIsLive(true);
          }
        }
      } catch {
        setIsLive(false);
      }
    }

    fetchRepos();
  }, []);

  return (
    <section id="github" className="py-20 lg:py-28 relative bg-[#0A0A0A] border-t border-[#1C1C1C]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <h2 className="font-serif-display text-4xl sm:text-5xl font-normal tracking-tight text-white">
              Open Source Repositories
            </h2>
            <p className="text-sm text-[#888888] font-light">
              Verified source code and experiments hosted on{' '}
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline font-mono"
              >
                github.com/{PERSONAL_INFO.githubUsername}
              </a>
            </p>
          </div>

          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold text-black bg-white hover:bg-neutral-200 transition-all shadow-md self-start md:self-auto"
          >
            <span>View All On GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, idx) => (
            <motion.div
              key={repo.id || repo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="rounded-2xl p-6 bg-[#121212] border border-[#222222] hover:border-neutral-500 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors shrink-0" />
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm font-semibold text-white hover:underline truncate max-w-[200px]"
                    >
                      {repo.name}
                    </a>
                  </div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#666666] hover:text-white p-0.5 transition-colors"
                    aria-label={`Open repository ${repo.name}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <p className="text-xs text-[#888888] leading-relaxed line-clamp-3 mb-4 min-h-[3rem] font-light">
                  {repo.description || 'Public software engineering repository.'}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1C1C1C] flex items-center justify-between text-xs font-mono text-[#777777]">
                <div className="flex items-center gap-1.5 text-neutral-300">
                  <span className="w-2 h-2 rounded-full bg-neutral-400 inline-block" />
                  <span>{repo.language || 'Python'}</span>
                </div>
                <span>Active</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
