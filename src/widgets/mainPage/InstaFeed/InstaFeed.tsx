"use client";

import { useEffect } from "react";
import Instafeed from "instafeed.js";
import "./InstaFeed.css";

interface InstagramFeedProps {
  accessToken: string;
  userId: string;
  limit?: number;
  containerId?: string;
}

export default function InstagramFeed({
  accessToken,
  userId,
  limit = 18, // 5x3을 기본값으로 설정
  containerId = "instafeed",
}: InstagramFeedProps) {
  useEffect(() => {
    const container = document.getElementById(containerId);

    if (!container) {
      console.error(
        `Instagram 피드를 표시할 컨테이너(#${containerId})를 찾을 수 없습니다.`
      );
      return;
    }

    const feed = new Instafeed({
      accessToken,
      //@ts-ignore
      userId,
      limit,
      template: `
        <a href="{{link}}" target="_blank" rel="noopener noreferrer" class="insta-post">
          <img src="{{image}}" alt="{{caption}}" class="insta-img"/>
          <div class="overlay">
            <i class="fa-brands fa-instagram"></i>
          </div>
        </a>
      `,
      after: () => {
        console.log("✅ Instagram 피드가 성공적으로 로드되었습니다!");
      },
    });

    feed.run();
  }, [accessToken, userId, limit, containerId]);

  return <div id={containerId} className="grid grid-cols-6 gap-3 p-4"></div>;
}
