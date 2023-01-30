import { useState, useEffect } from 'react';
import { Link, Element, Events } from 'react-scroll';

const TableOfContents = () => {
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    Events.scrollEvent.register('begin', (to, element) => {
      setActiveItem(to);
    });

    return () => {
      Events.scrollEvent.remove('begin');
    };
  }, []);

  const items = [
    { name: 'Introduction', id: 'introduction' },
    { name: 'Chapter 1', id: 'chapter-1' },
    { name: 'Chapter 2', id: 'chapter-2' },
    { name: 'Conclusion', id: 'conclusion' },
  ];

  return (
    <div className="fixed top-0 left-0">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link
              activeclassName="active"
              to={item.id}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onSetActive={() => setActiveItem(item.id)}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      {items.map((item) => (
        <Element name={item.id} key={item.id}>
          <h2>{item.name}</h2>
          {/* Content goes here */}
        </Element>
      ))}
    </div>
  );
};
