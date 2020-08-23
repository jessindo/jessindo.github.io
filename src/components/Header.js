import React, { Fragment } from 'react';
import Headroom from 'react-headroom';
import { Flex, /* Image */} from 'rebass/styled-components';
import styled from 'styled-components';
import { SectionLinks } from 'react-scroll-section';
import RouteLink from './RouteLink';
// import Logo from './Logo/Portfolio.svg';

const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

const HeaderContainer = styled(Headroom)`
  * {
    font-family: Montserrat, sans-serif;
    font-size: 1.05em;
    transition: background-color 0.1s ease;
  }

  .headroom--pinned {
    // background-color: ${(props) => props.theme.colors.primaryDark};
    background-color: white;
  }

  // added this to change text colour in pinned headroom
  .headroom--pinned span {
    color: ${(props) => props.theme.colors.primaryLight};
  }

  position: absolute;
  width: 100%;
`;

const formatLinks = (allLinks) =>
  Object.entries(allLinks).reduce(
    (acc, [key, value]) => {
      const isHome = key === 'home';
      return isHome
        ? {
            ...acc,
            home: value,
          }
        : {
            ...acc,
            links: [...acc.links, { name: capitalize(key), value }],
          };
    },
    { links: [], home: null },
  );

const Header = () => (
  <HeaderContainer>
    <Flex
      flexWrap="wrap"
      // justifyContent="space-between"
      justifyContent="center"
      alignItems="center"
      p={3}
    >
      <SectionLinks>
        {({ allLinks }) => {
          const { home, links } = formatLinks(allLinks);

          const homeLink = home && (
            <>
              <RouteLink
                key="Home"
                onClick={home.onClick}
                selected={home.isSelected}
                name="Home"
              />
              <RouteLink
                key="Resume"
                onClick={() => window.open("", "_blank")}
                name="Resume"
              />
            </>
          );
          // home && (
          //   <Image
          //     src={Logo}
          //     width="50px"
          //     alt="Portfolio Logo"
          //     onClick={home.onClick}
          //     style={{
          //       cursor: 'pointer',
          //     }}
          //   />
          // );
          const navLinks = links.map(({ name, value }) => (
            <RouteLink
              key={name}
              onClick={value.onClick}
              selected={value.isSelected}
              name={name}
            />
          ));

          return (
            <Fragment>
              {homeLink}
              {/* <Flex mr={[0, 3, 5]}>{navLinks}</Flex> */}
              {navLinks}
            </Fragment>
          );
        }}
      </SectionLinks>
    </Flex>
  </HeaderContainer>
);

export default Header;
