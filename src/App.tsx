import styled from "styled-components";
import { AnimatePresence, motion, useMotionValue, useTransform, useViewportScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";


const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

`;

const Box1 = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.05);
`;

const Box2 = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.05);
`;

const Circle = styled(motion.div)`
  background-color: white;
  height: 70px;
  width: 70px;
  border-radius: 35px;
  place-self: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.05);
`;

const myVars = {
  start: { scale: 0 },
  end: { scale: 1, rotateZ: 360, transition: {type: "spring", damping: 5 }}
}

const boxVariants = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.25,
    }
  }
}

const circleVariants = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
  }
}

const mouseHoverVariants = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { scale: 1, borderRadius: "100px" },
}

const BiggerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  overflow: hidden;
`;

const Svg = styled.svg`
  width: 300px;
  height: 300px;
  path {
    stroke: white;
    stroke-width: 2;
  }
`;

const svg = {
  start: { pathLength: 0, fill: "rgba(255, 255, 255, 0)" },
  end: {
    fill: "rgba(255, 255, 255, 1)",
    pathLength: 1,
  },
};

const Button = styled.button`
  width: 80px;
  height: 35px;
  border-radius: 15px;
`

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  /**
   * MotionValues는 애니메이션 값의 상태(state)와 속도(velocity)를 추적합니다. 
   * 모든 모션 컴포넌트는 내부적으로 MotionValues를 사용하여 애니메이션 값의 상태와 속도를 추적합니다. 
   * 일반적으로 이들은 자동으로 생성됩니다. 
   * (MotionValue는 React State가 아니기 때문에 Motion Value값이 바뀌어도 리랜더링이 일어나지 않는다.)
   * 
   * 
   * useTransform 훅을 통해 MotionValues를 연결합니다.
   * useTransform()는 한 값 범위에서 다른 값 범위로 매핑하여 다른 MotionValue의 output을 변환하는 MotionValue를 만듭니다.
   * x(Motion Value)값을 다른 output값으로 변환해준다.
   */
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    x, 
    [-800, 0, 800],
    [
      "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
      "linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))",
      "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))"
    ]  
  );
  
  const { scrollYProgress } = useViewportScroll(); 
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.2])


  /**
   * 
   * AnimatePresence를 사용하면 React 트리에서 컴포넌트가 제거될 때 제거되는 컴포넌트에 애니메이션 효과를 줄 수 있습니다.
   * React에는 다음과 같은 수명 주기 메서드가 없기 때문에 종료 애니메이션을 활성화해야 합니다.
   * AnimatePresence는 언제나 visible 상태여야 작동한다.
   * 
   * exit
   * 이 컴포넌트가 트리에서 제거될 때 애니메이션할 대상입니다.
   * 
   */
  const [showing, setShowing] = useState(false);
  const toggleShowing = () => {
    setShowing(prev => !prev);
  }
  const boxVariants2 = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateZ: 360,
    },
    leaving: {
      opacity: 0,
      y: 50,
    }
  }


  const SlideBox = styled(motion.div)`
    width: 300px;
    height: 150px;
    top: 170vh;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.05);
  `;
  const [visible, setVisible] = useState(1);
  const nextPlease = () => setVisible(prev => prev === 10 ? 10 : prev + 1);
  const prevPlease = () => setVisible(prev => prev === 1 ? 1 : prev - 1);

  const slideBox = {
    invisible: {
      x: 500,
      opacity: 0,
      scale: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1
      }
    },
    exit: {
      x: -500,
      opacity: 0,
      scale: 0,
      transition: {
        duration: 1
      }
    }
  }
  return (
    <Wrapper style={{ background: gradient }}>
      <Box1 variants={myVars} initial="start" animate="end" />
      <Box2 variants={boxVariants} initial="start" animate="end">
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
      </Box2>
      <BiggerBox ref={biggerBoxRef}>
        <Box1
          drag
          dragSnapToOrigin
          dragElastic={0.5}
          dragConstraints={biggerBoxRef} 
          variants={mouseHoverVariants} 
          whileHover="hover"
           whileTap="click"/>
      </BiggerBox>
      <Box1 style={{x, rotateZ, scale }} drag="x" dragSnapToOrigin />
      <Svg
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512">
        <motion.path
          variants={svg}
          initial="start"
          animate="end"
          transition={{
            default: {duration: 5},
            fill: {duration : 2, delay: 1},
          }}
          d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
        ></motion.path>
      </Svg>
      <Button onClick={toggleShowing}>Click Me!</Button>
      <AnimatePresence>
        {showing ? (
          <Box1 
            variants={boxVariants2}
            initial="initial"
            animate="visible"
            exit="leaving"
          /> 
        ):
         null 
        }
      </AnimatePresence>
      <Button onClick={prevPlease}>Prev</Button>
      <Button onClick={nextPlease}>Next</Button>
      <AnimatePresence>

        <SlideBox
          variants={slideBox}
          initial="invisible"
          animate="visible"
          exit="exit"
          key={visible}
        >
          {visible}
        </SlideBox>
        
      </AnimatePresence>
    </Wrapper>

  );
}

export default App;
