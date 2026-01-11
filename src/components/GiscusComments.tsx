'use client';

import Giscus from '@giscus/react';

export default function GiscusComments() {
  return (
    <div className="w-full mt-8">
      <Giscus
        id="comments"
        repo="tndg16-bot/portfolio-site"
        repoId="PLACEHOLDER_REPO_ID" // TODO: Set this after enabling GitHub Discussions
        category="Comments"
        categoryId="PLACEHOLDER_CATEGORY_ID" // TODO: Set this after enabling GitHub Discussions
        mapping="pathname"
        term="Welcome to @giscus/react component!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="dark"
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
