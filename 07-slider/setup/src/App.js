import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';
function App() {
  // take your data in state before working with it .
  //the slider is working on the index of the array we have some classes .lastSlide .active and .nexSlide
  // we first rendered all the elements of the array with absolute position (same position &&  on top of each other )
  // based on the index we given the classes prevSlide .nextSlide and activeSlide (active has opacity 1 && other has opacity 0)
  // see style.css for styling
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let lastIndex = people.length - 1;
    if (index < 0) setIndex(lastIndex);
    if (index > lastIndex) setIndex(0);
  }, [index, people]);

  useEffect(() => {
    let myInterval = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => {
      clearInterval(myInterval);
    };
  }, [index]);

  const prevSlide = () => {
    setIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return setIndex(people.length - 1);
      }
      setIndex(index - 1);
    });
  };

  const nextSlide = () => {
    setIndex((prevIndex) => {
      if (prevIndex >= people.length - 1) {
        return setIndex(0);
      }
      setIndex(index + 1);
    });
  };

  return (
    <section className='section'>
      <div className='title'>
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className='section-center'>
        {people.map((person, personIndex) => {
          const { id, image, title, name, quote } = person;
          let position = 'lastSlide';

          if (personIndex === index) {
            position = 'activeSlide';
          }
          if (personIndex > index) position = 'nextSlide';
           if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = 'lastSlide';
          }

          return (
            <article key={id} className={position}>
              <img src={image} alt={name} className='person-img' />
              <h4>{name}</h4>
              <p className='title'>{title}</p>
              <p className='text'>{quote}</p>
              <FaQuoteRight className='icon' />
            </article>
          );
        })}
        <button className='prev' onClick={prevSlide}>
          <FiChevronLeft />
        </button>
        <button className='next' onClick={nextSlide}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
