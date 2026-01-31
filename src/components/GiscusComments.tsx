'use client';

import Giscus from '@giscus/react';

export default function GiscusComments() {
  return (
    <div className="w-full mt-8">
      <Giscus
        id="comments"
        repo="tndg16-bot/portfolio-site"
        repoId="R_kgDOQ2r01Q"
        category="General"
        categoryId="DIC_kwDOQ2r01c4C01dx"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="dark"
        lang="ja"
        loading="lazy"
      />
    </div>
  );
}
