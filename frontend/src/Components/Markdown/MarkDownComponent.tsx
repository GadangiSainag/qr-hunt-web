import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface MarkDownCompProps {
    content: string;
}

const MarkDownComponent: React.FC<MarkDownCompProps> = ({ content }) => {
    return (

            <div className="prose max-w-none dark:prose-invert">
                <ReactMarkdown remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}>
                    {content}
                </ReactMarkdown>
            </div>
        
    );
};

export default MarkDownComponent;

