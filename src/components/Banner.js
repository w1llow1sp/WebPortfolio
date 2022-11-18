import { Col, Container, Row } from 'react-bootstrap';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';

import headerImage from '../assets/img/header-img.svg';
import TrackVisibility from 'react-on-screen';

const Banner = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const [index, setIndex] = useState(1);
    const toRotate = ['Developer', 'Web Developer', 'Frontend Developer'];
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => {
            clearInterval(ticker);
        };
    }, [text]);

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting
            ? fullText.substring(0, text.length - 1)
            : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta((prevDelta) => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setIndex((prevIndex) => prevIndex - 1);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setIndex(1);
            setDelta(500);
        } else {
            setIndex((prevIndex) => prevIndex + 1);
        }
    };

    return (
        <section className='banner' id='home'>
            <Container>
                <Row className='align-items-center'>
                    <Col xs={12} md={6} xl={7}>
                        <TrackVisibility>
                            {({ isVisible }) => (
                                <div
                                    className={
                                        isVisible
                                            ? 'animate__animated animate__fadeIn'
                                            : ''
                                    }
                                >
                                    <span className='tagline'>
                                        Welcome to my Portfolio
                                    </span>
                                    <h1>
                                        {`Hi I'm `}
                                        <span className='wrap'> {text}</span>
                                    </h1>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Mattis molestie a iaculis at
                                        erat pellentesque adipiscing commodo.
                                        Egestas sed sed risus pretium quam.
                                        Donec ultrices tincidunt arcu non
                                        sodales neque sodales. Luctus accumsan
                                        tortor posuere ac. Lacus laoreet non
                                        curabitur gravida arcu. Neque ornare
                                        aenean euismod elementum nisi quis
                                        eleifend quam.
                                    </p>
                                    <button
                                        onClick={() => console.log('connect')}
                                    >
                                        Let's connect{' '}
                                        <ArrowRightCircle size={25} />
                                    </button>
                                </div>
                            )}
                        </TrackVisibility>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <img src={headerImage} alt='Header image' />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Banner;
