import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BaseProvider, LightTheme } from 'baseui';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import EmployeeOverview from './containers/EmployeeOverview';
import EmployeeExplorer from './containers/EmployeeExplorer';
import './App.css';

const engine = new Styletron();

export default () => {
  return (
    <div className="App">
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <Router>
            <Switch>
              <Route path="/" exact={true} component={EmployeeExplorer}/>
              <Route path="/overview:name?" component={EmployeeOverview}/>
            </Switch>
          </Router>
        </BaseProvider>
      </StyletronProvider>
    </div>
  );
}