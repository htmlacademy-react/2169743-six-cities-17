import MainPage from './../../pages/main-page';

type AppProps = {
  countOffer: number;
};

function App(props: AppProps) {
  return <MainPage {...props} />;
}

export default App;
