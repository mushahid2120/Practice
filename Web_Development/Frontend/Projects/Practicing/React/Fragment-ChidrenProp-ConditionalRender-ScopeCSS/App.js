import React from 'react';
import styles from './app.module.css'


console.log(styles.cssModule)
 const App=(obj)=> {
    console.log(obj)
    const {arg1,children}=obj;
    console.log(arg1,children)
  return (
    <>
        <div className={styles.cssModule} >App</div>
    {
        children
    }
    </>
  )
}
export default App