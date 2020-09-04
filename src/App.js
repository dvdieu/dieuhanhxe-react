import React from 'react';
//router
import { BrowserRouter, Switch } from 'react-router-dom';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
//page
import Dashboard from './modules/dashboard/scenes/Dashboard';
import Routes from './modules/router/scenes/Routes';
import CreateRouter from './modules/router/scenes/CreateRouter';
import Drivers from './modules/driver/scenes/Drivers';
import Fleets from './modules/fleet/scenes/Fleets';
import Fleet from './modules/fleet/scenes/Fleet';
import CreatePost from './modules/post/scenes/CreatePost';
import PostDetail from './modules/post/scenes/PostDetail';
import Products from './modules/post/scenes/Products';
import Posts from './modules/post/scenes/Posts';
import SetupWarehouse from './modules/router/scenes/SetupWarehouse';
import HintRouter from './modules/router/scenes/HintRouter';
//auth
import SignIn from './modules/auth/scenes/SignIn';
import SignUp from './modules/auth/scenes/SignUp';
import ErrorPage from './components/Error';
//styles
import './assets/scss/overide-ant-design.scss';
import './assets/scss/common.scss';

const MyRouter = () => {
	return (
		<BrowserRouter>
			<Switch>
				<PublicRoute restricted={true} component={SignIn} path="/sign-in" exact />
				<PublicRoute restricted={true} component={SignUp} path="/sign-up" exact />
				<PrivateRoute component={Dashboard} path="/" exact />
				<PrivateRoute component={Dashboard} path="/dashboard" exact />
				<PrivateRoute component={Routes} path="/routes" exact />
				<PrivateRoute component={CreateRouter} path="/route/create" exact />
				<PrivateRoute component={SetupWarehouse} path="/warehouse/setup/:id" exact />
				<PrivateRoute component={HintRouter} path="/warehouse/hint/:id" exact />

				<PrivateRoute component={Drivers} path="/taixe" exact />
				<PrivateRoute component={Fleets} path="/doixe" exact />
				<PrivateRoute component={Fleet} path="/fleet/:id" exact />
				<PrivateRoute component={Posts} path="/phantuyen/danhsach" exact />
				<PrivateRoute component={CreatePost} path="/phantuyen/create" exact />
				<PrivateRoute component={PostDetail} path="/phantuyen/chitiet/:id" exact />
				<PrivateRoute component={Products} path="/phantuyen/chitiethanghoa/:id" exact />
				<PrivateRoute component={ErrorPage} path="*" exact />
			</Switch>
		</BrowserRouter>
	)
}


const App = () => {
	return <MyRouter />;
};

export default App;
