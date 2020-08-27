import React from 'react';

//lib
import { Helmet, HelmetProvider } from "react-helmet-async";
//router
import { Router, Switch } from "react-router-dom";
import RoutePublic from './components/RoutePublic';
//config
import config from "./config/info";
//utils
import history from "./utils/history";
//page
import Drivers from './modules/driver/scenes/Drivers';
import Fleets from './modules/fleet/scenes/Fleets';
import Fleet from './modules/fleet/scenes/Fleet';
import Merchandises from './modules/merchandise/scenes/Merchandises';
import CreatePost from './modules/post/scenes/CreatePost';
import PostDetail from './modules/post/scenes/PostDetail';
import Products from './modules/post/scenes/Products';
import Posts from './modules/post/scenes/Posts';
import Warehouses from './modules/warehouse/scenes/Warehouses';
import SetupWarehouse from './modules/router/scenes/SetupWarehouse';
import HintRouter from './modules/router/scenes/HintRouter';
import Dashboard from './modules/dashboard/scenes/Dashboard';
import ErrorPage from './components/Error';
//styles
import './assets/scss/overide-ant-design.scss';
import './assets/scss/common.scss';
import styled from "styled-components";
// import Confirm from './modules/post/components/Confirm';

const Main = styled.main`
     {
        height: 100%;
    }
`;

const MyRouter = () => {
	return (
		<HelmetProvider>
			<Router
				history={history}
			>
				<Helmet
					defer={false}
					htmlAttributes={{ lang: "pt-br" }}
					encodeSpecialCharacters={true}
					defaultTitle={config.name}
					titleTemplate={`%s | ${config.name}`}
					titleAttributes={{ itemprop: "name", lang: "pt-br" }}
				/>
				<Main>
					<Switch>
						<RoutePublic
							path="/"
							exact
							component={Dashboard}
						/>
						<RoutePublic
							path="/warehouses"
							exact
							component={Warehouses}
						/>
						<RoutePublic
							path="/warehouse/setup/:id"
							exact
							component={SetupWarehouse}
						/>
						<RoutePublic
							path="/warehouse/hint/:id"
							exact
							component={HintRouter}
						/>
						<RoutePublic
							path="/dashboard"
							exact
							component={Dashboard}
						/>
						<RoutePublic
							path="/taixe"
							exact
							component={Drivers}
						/>
						<RoutePublic
							path="/doixe"
							exact
							component={Fleets}
						/>
						<RoutePublic
							path="/fleet/:id"
							exact
							component={Fleet}
						/>
						<RoutePublic
							path="/hanghoa"
							exact
							component={Merchandises}
						/>
						<RoutePublic
							path="/phantuyen/danhsach"
							exact
							component={Posts}
						/>
						<RoutePublic
							path="/phantuyen/create"
							exact
							component={CreatePost}
						/>
						<RoutePublic
							path="/phantuyen/chitiet/:id"
							exact
							component={PostDetail}
						/>
						<RoutePublic
							path="/phantuyen/chitiethanghoa/:id"
							exact
							component={Products}
						/>
						<RoutePublic
							path="*"
							exact
							component={ErrorPage}
						/>
					</Switch>
				</Main>
			</Router>
		</HelmetProvider>
	)
}


const App = () => {
	return <MyRouter />;
};

export default App;
