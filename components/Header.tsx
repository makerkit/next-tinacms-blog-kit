import Logo from '~/components/Logo';
import LayoutContainer from "~/components/LayoutContainer";

const Header: React.FCC = () => {
  return (
    <LayoutContainer>
      <header className={'flex flex-1 justify-between py-4'}>
        <div>
          <Logo />
        </div>
      </header>
    </LayoutContainer>
  );
};

export default Header;
