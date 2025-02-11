import React, { useState } from 'react';

interface TruncateTextProps {
  text?: string;
  maxLength?: number;
  expandable?: boolean;
  className?: string;
}

const TruncateText = ({
  text,
  maxLength = 100,
  expandable = false,
  className = ''
}: TruncateTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  if (!text) {
    return null;
  }
  const shouldTruncate = text.length > maxLength;

  if (!shouldTruncate) {
    return <span className={className}>{text}</span>;
  }

  if (!expandable) {
    return (
      <span className={className} title={text}>
        {text.slice(0, maxLength)}...
      </span>
    );
  }

  return (
    <div className={className}>
      {isExpanded ? text : `${text.slice(0, maxLength)}...`}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="ml-2 text-blue-500 hover:text-blue-700 text-sm font-medium"
      >
        {isExpanded ? 'Show less' : 'Read more'}
      </button>
    </div>
  );
};

export default TruncateText;