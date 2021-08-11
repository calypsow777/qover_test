import React from 'react';

import AppBar from './components/AppBar';
import Footer from './components/Footer';
import styles from './App.module.scss';

function App() {
  // TODO: use current screen in redux state
  // const background = styles.loginScreenBg;
  const background = styles.pricePlansScreenBg;
  return (
    <div className={`${styles.appContainer} ${background}`}>
      <AppBar />
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Ad eos esse aliquam rerum, earum nemo enim voluptate magni
        expedita repudiandae beatae hic corporis minima,
        odit voluptatem ab laudantium odio doloribus!
      </div>
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Ad eos esse aliquam rerum, earum nemo enim voluptate magni
        expedita repudiandae beatae hic corporis minima,
        odit voluptatem ab laudantium odio doloribus!
      </div>
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Ad eos esse aliquam rerum, earum nemo enim voluptate magni
        expedita repudiandae beatae hic corporis minima,
        odit voluptatem ab laudantium odio doloribus!
      </div>
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Ad eos esse aliquam rerum, earum nemo enim voluptate magni
        expedita repudiandae beatae hic corporis minima,
        odit voluptatem ab laudantium odio doloribus!
      </div>
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Ad eos esse aliquam rerum, earum nemo enim voluptate magni
        expedita repudiandae beatae hic corporis minima,
        odit voluptatem ab laudantium odio doloribus!
      </div>
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Ad eos esse aliquam rerum, earum nemo enim voluptate magni
        expedita repudiandae beatae hic corporis minima,
        odit voluptatem ab laudantium odio doloribus!
      </div>
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Ad eos esse aliquam rerum, earum nemo enim voluptate magni
        expedita repudiandae beatae hic corporis minima,
        odit voluptatem ab laudantium odio doloribus!
      </div>
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Ad eos esse aliquam rerum, earum nemo enim voluptate magni
        expedita repudiandae beatae hic corporis minima,
        odit voluptatem ab laudantium odio doloribus!
      </div>
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Ad eos esse aliquam rerum, earum nemo enim voluptate magni
        expedita repudiandae beatae hic corporis minima,
        odit voluptatem ab laudantium odio doloribus!
      </div>
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Ad eos esse aliquam rerum, earum nemo enim voluptate magni
        expedita repudiandae beatae hic corporis minima,
        odit voluptatem ab laudantium odio doloribus!
      </div>
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Ad eos esse aliquam rerum, earum nemo enim voluptate magni
        expedita repudiandae beatae hic corporis minima,
        odit voluptatem ab laudantium odio doloribus!
      </div>
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Ad eos esse aliquam rerum, earum nemo enim voluptate magni
        expedita repudiandae beatae hic corporis minima,
        odit voluptatem ab laudantium odio doloribus!
      </div>
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
