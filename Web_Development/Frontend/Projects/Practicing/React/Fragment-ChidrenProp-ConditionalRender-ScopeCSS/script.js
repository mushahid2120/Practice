import {createRoot} from 'react-dom/client'
import { Fragment } from 'react/jsx-runtime'
import App from './App'

const root=createRoot(document.querySelector('#root'))
root.render(
            <Fragment>
                <h1>Hellow Man</h1>
                <h2>Welcome</h2>
                <App arg1="argument1"><h1>Children Element</h1></App>
                <div>{true  && "hkk"}</div>
            </Fragment>
                
            )