import { Helmet } from 'react-helmet';
import Banner from '../Components/Banner';
import CampManagement from '../Components/CampManagement';
import Feedback from '../Components/Feedback';
import Popular from '../Components/Popular';
import System from '../Components/System';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Medical camp pro</title>
                <meta name="description" content="Nested component" />
            </Helmet>
            <Banner></Banner>
            <Popular></Popular>
            <CampManagement></CampManagement>
            <Feedback></Feedback>
            <System></System>
        </div>
    );
};

export default Home;