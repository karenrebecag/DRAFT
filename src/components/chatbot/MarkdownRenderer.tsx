import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  const components: Components = {
    p: ({ children }) => <p>{children}</p>,
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    a: ({ href, children }) => (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    ul: ({ children }) => <ul>{children}</ul>,
    ol: ({ children }) => <ol>{children}</ol>,
    li: ({ children }) => <li>{children}</li>,
    code: ({ className, children }) => {
      const isBlock = className?.includes('language-');
      return isBlock ? (
        <pre>
          <code className={className}>{children}</code>
        </pre>
      ) : (
        <code>{children}</code>
      );
    },
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    h1: ({ children }) => <strong>{children}</strong>,
    h2: ({ children }) => <strong>{children}</strong>,
    h3: ({ children }) => <strong>{children}</strong>,
  };

  return (
    <div className="markdown-content">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
