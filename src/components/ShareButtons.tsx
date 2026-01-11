'use client';

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  XIcon,
  LineShareButton,
  LineIcon,
} from 'react-share';
import { motion } from 'framer-motion';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  return (
    <div className="flex gap-4 items-center my-8">
      <span className="text-gray-400 text-sm font-medium tracking-wider">SHARE</span>
      
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <TwitterShareButton url={url} title={title} className="hover:opacity-80 transition-opacity">
          <XIcon size={40} round className="bg-transparent" />
        </TwitterShareButton>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <FacebookShareButton url={url} title={title} className="hover:opacity-80 transition-opacity">
          <FacebookIcon size={40} round />
        </FacebookShareButton>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <LineShareButton url={url} title={title} className="hover:opacity-80 transition-opacity">
          <LineIcon size={40} round />
        </LineShareButton>
      </motion.div>
    </div>
  );
}
