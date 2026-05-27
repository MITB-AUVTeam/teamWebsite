"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { resolvedTeamCategories } from '@/components/ui/team-section-block-shadcnui';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const SQRT_5000 = Math.sqrt(5000);

const nonFacultyMembers = resolvedTeamCategories
  .filter((category) => category.title !== "Faculty Advisors and Mentor")
  .flatMap((category) => category.members);

const animeshIndex = nonFacultyMembers.findIndex((member) => member.name === "Animesh Mishra");
const centerIndex = Math.floor(nonFacultyMembers.length / 2);

const orderedMembers =
  animeshIndex === -1
    ? nonFacultyMembers
    : nonFacultyMembers.map((_, index) => {
      const sourceIndex =
        (index - centerIndex + animeshIndex + nonFacultyMembers.length) % nonFacultyMembers.length;
      return nonFacultyMembers[sourceIndex];
    });

const testimonials = orderedMembers.map((member, index) => ({
  tempId: index,
  testimonial: member.bio || member.role,
  by: `${member.name} / ${member.role}`,
  imgSrc: member.image,
}));

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize
}) => {
  const isCenter = position === 0;
  const navigate = useNavigate();
  const cardWidth = cardSize * 0.92;

  return (
    <div
      onClick={() => {
        if (isCenter) {
          navigate('/team');
        } else {
          handleMove(position);
        }
      }}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-700 ease-in-out",
        isCenter
          ? "z-10 bg-black text-white border-white/10"
          : "z-0 bg-black text-slate-300 border-white/10 hover:border-white/20"
      )}
      style={{
        width: cardWidth,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardWidth / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-white/10"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <div className="mb-4 flex justify-center">
        <div className="h-16 w-16 overflow-hidden rounded-full border border-white/10 bg-black p-1 shadow-none">
          <img
            src={testimonial.imgSrc}
            alt={testimonial.by}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </div>
      <h3 className={cn(
        "text-base sm:text-xl font-medium text-center",
        isCenter ? "text-white" : "text-slate-200"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-sm italic text-center",
        isCenter ? "text-slate-300" : "text-slate-500"
      )}>
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    setTestimonialsList((currentList) => {
      const newList = [...currentList];
      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const item = newList.shift();
          if (!item) return currentList;
          newList.push({ ...item, tempId: Math.random() });
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = newList.pop();
          if (!item) return currentList;
          newList.unshift({ ...item, tempId: Math.random() });
        }
      }
      return newList;
    });
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    const autoAdvance = window.setInterval(() => {
      handleMove(1);
    }, 4000);

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.clearInterval(autoAdvance);
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-transparent"
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = index - Math.floor(testimonialsList.length / 2);
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full text-2xl transition-colors",
            "bg-black border-2 border-white/10 text-slate-400 hover:bg-black hover:text-white hover:border-white/20",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full text-2xl transition-colors",
            "bg-black border-2 border-white/10 text-slate-400 hover:bg-black hover:text-white hover:border-white/20",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
