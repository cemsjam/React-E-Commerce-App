import React, { useRef, useEffect } from "react";
type InfiniteScrollProps = {
  children: React.ReactNode;
  onIntersect: () => void;
};
export const InfiniteScroll = ({ children, onIntersect }: InfiniteScrollProps) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onIntersect();
      }
    });

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
      observer.disconnect();
    };
  }, [onIntersect]);

  return (
    <div>
      {children}
      <div ref={bottomRef}></div>
    </div>
  );
};
