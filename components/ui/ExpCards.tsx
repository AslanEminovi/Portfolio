"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/use-outside-click";
import { cn } from "@/lib/utils";

// CloseIcon Component
export const CloseIcon = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={isDarkMode ? "white" : "black"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

// CircleIcon Component
export const CircleIcon = ({
  className,
  delay,
}: {
  className?: string;
  delay?: number;
}) => {
  return (
    <div
      className={cn(
        `pointer-events-none animate-pulse group-hover/cover:hidden group-hover/cover:opacity-100 group h-2 w-2 rounded-full bg-neutral-600 dark:bg-white opacity-20 group-hover/cover:bg-white`,
        className
      )}
      style={{
        transitionDelay: delay ? `${delay}s` : undefined,
      }}
    ></div>
  );
};

// Beam Component
export const Beam = ({
  className,
  delay,
  duration,
  hovered,
  width = 600,
  ...svgProps
}: {
  className?: string;
  delay?: number;
  duration?: number;
  hovered?: boolean;
  width?: number;
} & React.ComponentProps<typeof motion.svg>) => {
  const id = useId();

  return (
    <motion.svg
      width={width ?? "600"}
      height="1"
      viewBox={`0 0 ${width ?? "600"} 1`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("absolute inset-x-0 w-full", className)}
      {...svgProps}
    >
      <motion.path
        d={`M0 0.5H${width ?? "600"}`}
        stroke={`url(#svgGradient-${id})`}
      />

      <defs>
        <motion.linearGradient
          id={`svgGradient-${id}`}
          key={String(hovered)}
          gradientUnits="userSpaceOnUse"
          initial={{
            x1: "0%",
            x2: hovered ? "-10%" : "-5%",
            y1: 0,
            y2: 0,
          }}
          animate={{
            x1: "110%",
            x2: hovered ? "100%" : "105%",
            y1: 0,
            y2: 0,
          }}
          transition={{
            duration: hovered ? 0.5 : duration ?? 2,
            ease: "linear",
            repeat: Infinity,
            delay: hovered ? Math.random() * 0.8 + 0.2 : delay ?? 1,
            repeatDelay: hovered ? Math.random() * 1 + 1 : delay ?? 1,
          }}
        >
          <stop stopColor="#2EB9DF" stopOpacity="0" />
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </motion.svg>
  );
};

// ExpandableCardDemo Component
export function ExpandableCardDemo({ isDarkMode }: { isDarkMode: boolean }) {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 dark:bg-black/50 h-full w-full z-10 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.name}-${id}-collapse`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white dark:bg-neutral-800 rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon isDarkMode={isDarkMode} />
            </motion.button>
            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className="w-full max-w-[600px] h-full md:h-fit md:max-h-[95%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.name}-${id}`} className="flex justify-center items-center h-60">
                <Image
                  priority
                  width={200}
                  height={200}
                  src={`/${active.src}`}
                  alt={active.name}
                  className="object-contain"
                />
              </motion.div>

              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <motion.h3
                      layoutId={`name-${active.name}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.name}
                    </motion.h3>
                    <motion.p
                      layoutId={`title-${active.title}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.title}
                    </motion.p>
                  </div>

                  <motion.button
                    layoutId={`button-${active.name}-${id}-collapse`}
                    className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black dark:bg-neutral-700 dark:text-white dark:hover:bg-green-500 mt-4 md:mt-0 ml-4"
                    onClick={() => setActive(null)}
                  >
                    Collapse
                  </motion.button>
                </div>
                <div className="pt-4 relative">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-72 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4 space-y-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.name}-${id}`}
            key={`card-${card.name}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row">
              <motion.div layoutId={`image-${card.name}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={`/${card.src}`}
                  alt={card.name}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div>
                <motion.h3
                  layoutId={`name-${card.name}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                >
                  {card.name}
                </motion.h3>
                <motion.p
                  layoutId={`title-${card.title}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                >
                  {card.title}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.name}-${id}-view`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black dark:bg-neutral-700 dark:text-white dark:hover:bg-green-500 mt-4 md:mt-0 ml-4"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the card's onClick
                setActive(card);
              }}
            >
              View
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </div>
  );
}

// Example 'cards' array
const cards = [
  {
    name: "Aslan",
    title: "Front-End Developer",
    src: "aslan.jpeg",
    content: () => (
      <p>
        As a <b>Front-End Developer</b>, I specialize in creating{" "}
        <b>responsive</b> and <b>interactive user interfaces</b> using modern web
        technologies such as <b>React</b>, <b>Next.js</b>, and <b>Tailwind CSS</b>.
        My focus is on building <b>scalable</b> and{" "}
        <b>maintainable front-end architectures</b> that provide a seamless user
        experience. I have a strong understanding of <b>HTML</b>, <b>CSS</b>, and
        <b>JavaScript</b>, and I am proficient in using various front-end
        frameworks and libraries to deliver high-quality web applications.
        Additionally, I am experienced in <b>optimizing web performance</b> and
        ensuring <b>cross-browser compatibility</b>, which helps in delivering
        fast and accessible websites. My goal is to create{" "}
        <b>intuitive</b> and <b>engaging user experiences</b> that meet both
        user needs and business objectives.
      </p>
    ),
  },
  {
    name: "Enes",
    title: "Back-End Developer",
    src: "enes.jpeg",
    content: () => (
      <p>
        As a <b>Back-End Developer</b>, I have extensive experience in developing{" "}
        <b>robust</b> and <b>scalable server-side applications</b> using{" "}
        <b>.NET</b> and <b>.NET Core</b>. My expertise includes building{" "}
        <b>RESTful APIs</b>, working with <b>databases</b>, and ensuring the{" "}
        <b>security</b> and <b>performance</b> of back-end systems. I am skilled
        in <b>C#</b>, <b>SQL</b>, and various other back-end technologies, and I
        am committed to delivering <b>efficient</b> and{" "}
        <b>reliable server-side solutions</b>. My goal is to create{" "}
        <b>high-performance</b> and <b>secure back-end systems</b> that support
        the needs of modern web applications.
      </p>
    ),
  },
  {
    name: "Bufy",
    title: "UI/UX Designer",
    src: "bufy.jpeg",
    content: () => (
      <p>
        As a <b>UI/UX Designer</b>, I focus on creating visually appealing and{" "}
        <b>user-centric designs</b> that enhance the overall user experience. I utilize
        tools like <b>Figma</b>, <b>Adobe XD</b>, and <b>Sketch</b> to design intuitive
        interfaces that are both aesthetically pleasing and functionally effective.
        My process involves thorough user research, wireframing, prototyping, and user
        testing to ensure that the designs meet the needs and expectations of the target
        audience. I collaborate closely with developers and stakeholders to bring
        designs to life, ensuring seamless integration and optimal performance across
        various devices and platforms.
      </p>
    ),
  },
  {
    name: "Batu",
    title: "Project Manager",
    src: "batu.jpeg",
    content: () => (
      <p>
        As a <b>Project Manager</b>, I oversee the planning, execution, and completion of
        projects to ensure they are delivered on time and within budget. I coordinate
        between cross-functional teams, manage resources, and implement effective
        strategies to mitigate risks and address challenges. My role involves setting
        clear project goals, defining scopes, creating detailed project plans, and
        monitoring progress through regular status updates and performance metrics.
        I facilitate communication among team members and stakeholders, ensuring that
        everyone is aligned and informed throughout the project lifecycle. My goal is
        to deliver high-quality projects that meet or exceed client expectations while
        fostering a collaborative and efficient work environment.
      </p>
    ),
  },
];