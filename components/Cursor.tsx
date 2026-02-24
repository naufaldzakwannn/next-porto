"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = mouseX - 5 + "px";
        cursorRef.current.style.top = mouseY - 5 + "px";
      }
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      if (followerRef.current) {
        followerRef.current.style.left = followerX - 18 + "px";
        followerRef.current.style.top = followerY - 18 + "px";
      }
      requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      if (followerRef.current) {
        followerRef.current.style.transform = "scale(2)";
        followerRef.current.style.opacity = "0.3";
      }
    };

    const onLeaveLink = () => {
      if (followerRef.current) {
        followerRef.current.style.transform = "scale(1)";
        followerRef.current.style.opacity = "0.6";
      }
    };

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    animate();

    return () => {
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
}
