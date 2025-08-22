// ill add constants like stats blog posts etc. later
// TODO: use nextjs postgres backend for the blog instead lol

// fix this (also all the images aint even finished LOL)

// ill add constants like stats blog posts etc. later
// TODO: use nextjs postgres backend for the blog instead lol

// fix this (also all the images aint even finished LOL)

// CANCER

// CCCSOLUTIONS
import ccc1 from "../images/projects/cccsolutions/1.png";
import ccc2 from "../images/projects/cccsolutions/2.png";
import ccc3 from "../images/projects/cccsolutions/3.png";

// DIGITAL FLIGHT DYNAMICS A350X
import a350x1 from "../images/projects/a350x/1.png";
import a350x2 from "../images/projects/a350x/2.png";
import a350x3 from "../images/projects/a350x/3.png";
import a350x4 from "../images/projects/a350x/4.png";

// PAWDITOR
import pawditor1 from "../images/projects/pawditor/1.png";
import pawditor2 from "../images/projects/pawditor/2.png";
import pawditor3 from "../images/projects/pawditor/3.png";
import pawditor4 from "../images/projects/pawditor/4.png";

// MATHIFY
import mathify1 from "../images/projects/mathify/1.png";
import mathify2 from "../images/projects/mathify/2.png";
import mathify3 from "../images/projects/mathify/3.png";

// A350 PORTFOLIO
import portfolio1 from "../images/projects/portfolio/1.png";
import portfolio2 from "../images/projects/portfolio/2.png";
import portfolio3 from "../images/projects/portfolio/3.png";

// FOCUSFLOW
import focusflow1 from "../images/projects/focusflow/1.png";

// SATDUEL
import satduel1 from "../images/projects/satduel/1.png";
import satduel2 from "../images/projects/satduel/2.png";
import satduel3 from "../images/projects/satduel/3.png";
import satduel4 from "../images/projects/satduel/4.png";

// NOTECONVERT
import noteconvert1 from "../images/projects/noteconvert/1.png";
import noteconvert2 from "../images/projects/noteconvert/2.png";
import noteconvert3 from "../images/projects/noteconvert/3.png";

// FUKUSHIMA 2044
import fukushima1 from "../images/projects/fukushima2044/1.png";




export const PROJECTS = [
    {
        title: "CCCSOLUTIONS",
        shortTitle: "CCC",
        description: (
            <>
                THE LARGEST CANADIAN COMPUTING COMPETITION SOLUTION REPOSITORY WITH 2800+ USERS AND 270+ CURATED SOLUTIONS
            </>
        ),
        images: [ccc1, ccc2, ccc3],
        date: "2024",
        technologies: ["REACT.JS", "TAILWINDCSS", "POCKETBASE"],
        link: "https://cccsolutions.ca/",
        github: "http://github.com/cccsolutions/CCCSolutions/"
    },
    {
        title: "DIGITAL FLIGHT DYNAMICS A350X",
        shortTitle: "A350X",
        description: (
            <>
                A HIGH FIDELITY REPLICA OF THE AIRBUS A350 FOR MICROSOFT FLIGHT SIMULATOR 2020
            </>
        ),
        images: [a350x1, a350x2, a350x3, a350x4],
        date: "2025",
        technologies: ["REACT.JS", "SVG", "TYPESCRIPT", "RUST", "MSFS SDK"],
        link: "https://www.youtube.com/channel/UC5jbh_w1LPAb6XO1EZkqvrw",
        discord: "https://discord.com/invite/JtcFmhcAME"
    },
    {
        title: "PAWDITOR",
        shortTitle: "PAWDITOR",
        description: (
            <>
                AUTOMATED TESTING PLATFORM USING CAT-THEMED AI AGENTS TO SIMULATE USERS AND FIND UX BUGS SECURITY ISSUES
            </>
        ),
        images: [pawditor1, pawditor2, pawditor3, pawditor4],
        date: "2025",
        technologies: ["SVELTEKIT", "PLAYWRIGHT", "GEMINI", "DOCKER"],
        link: "https://devpost.com/software/pawditor",
        github: "http://github.com/stockermc/spurhacks2025/"
    },
    {
        title: "MATHIFY",
        shortTitle: "MATHIFY",
        description: (
            <>
                GENERATE SOLUTION VIDEOS TO MATH PROBLEMS IN THE STYLE 3BLUE1BROWN. WINNER AT IGNITIONHACKS V4
            </>
        ),
        images: [mathify1, mathify2, mathify3],
        date: "2024",
        technologies: ["REACT.JS", "OPENAI API", "PYTHON", "FLASK", "WOLFRAM ALPHA API", "MANIM"],
        link: "https://devpost.com/software/mathify-zgsk3t",
        github: "https://github.com/tankman61/mathify"
    },
    {
        title: "A350 PORTFOLIO",
        shortTitle: "PORTFOLIO",
        description: (
            <>
                THIS VERY WEBSITE! AIRBUS A350 FMS-STYLED PERSONAL PORTFOLIO BUILT TO SHOWCASE MY PROJECTS AND PASSIONS
            </>
        ),
        images: [portfolio1, portfolio2, portfolio3],
        date: "2025",
        technologies: ["NEXT.JS", "TYPESCRIPT", "TAILWINDCSS", "SVG"],
        link: "https://williamyang.ca",
        github: "https://github.com/tankman61/personal-website"
    },
    {
        title: "FOCUSFLOW",
        shortTitle: "FOCUSFLOW",
        description: (
            <>
                BROWSER EXTENSION USING OLLAMA TO INTELLIGENTLY DETECT AND BLOCK DISTRACTING WEBSITES
            </>
        ),
        images: [focusflow1],
        date: "2025",
        technologies: ["REACT.JS", "TYPESCRIPT", "OLLAMA", "FASTAPI"],
        link: null,
        github: "https://github.com/tankman61/yrhacks2025"
    },
    {
        title: "SATDUEL",
        shortTitle: "SATDUEL",
        description: (
            <>
                SAT PRACTICE PLATFORM WHERE STUDENTS CAN DUEL EACH OTHER IN REAL-TIME PRACTICE SESSIONS
            </>
        ),
        images: [satduel1, satduel2, satduel3, satduel4],
        date: "2024",
        technologies: ["DJANGO", "REACT.JS", "PYTHON", "SQLITE"],
        link: "https://satduel.com",
        github: null
    },
    {
        title: "NOTECONVERT",
        shortTitle: "NOTECONV.",
        description: (
            <>
                TRANSFORM AUDIO RECORDINGS INTO STRUCTURED STUDY NOTES. 2ND PLACE AT RECESSHACKS 4.0
            </>
        ),
        images: [noteconvert1, noteconvert2, noteconvert3],
        date: "2024",
        technologies: ["PYTHON", "OPENAI API", "REACT .JS"],
        link: null,
        github: "https://github.com/Agilan75/NoteConvert"
    },
    {
        title: "FUKUSHIMA 2044",
        shortTitle: "FUKUSHIMA",
        description: (
            <>
                SINGLE-PLAYER TOP-DOWN SURVIVAL SHOOTER BUILT USING PYGAME AND PYTMX
            </>
        ),
        images: [fukushima1],
        date: "2023",
        technologies: ["PYTHON", "PYGAME", "PYTMX"],
        link: null,
        github: "https://github.com/uglysquid/fukushima2044"
    }
];
