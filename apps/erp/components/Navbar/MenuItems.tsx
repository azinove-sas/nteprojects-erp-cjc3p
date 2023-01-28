import { useState, useEffect, useRef } from "react";
import Dropdown from "./Dropdown";
import { Box, Flex, Text, Link } from "rebass";
import { BiDownArrow, BiRightArrow } from "react-icons/bi";


const MenuItems = ({ items, depthLevel }: any) => {
  const [dropdown, setDropdown] = useState(false);

  let ref = useRef();

  useEffect(() => {
    const handler = (event: any) => {
      // @ts-ignore
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  return (
    <Box
      as={"li"}
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {items.url && items.submenu ? (
        <>
          <Box
            as={'button'}
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
            sx={{
              color: 'rgba(51, 48, 60, 0.68)'
            }}
          >
            {window.innerWidth < 960 && depthLevel === 0 ? (
              items.title
            ) : (
              <Flex sx={{
                alignItems: 'center',
                cursor: 'pointer',
                borderRadius: '0.4rem',
                position: 'relative',
                paddingBlock: '0.5rem',
                paddingInline: '0.7rem',
                minWidth: "100px"
                // ":hover": {
                //   'opacity': 'calc(.04 * 1)',
                // }
              }}>
                {items.icon && (
                  <Box sx={{
                    fontSize: '1.375rem',
                    marginInlineEnd: '0.625rem',
                    blockSize: '1em',
                    inlineSize: '1em',
                  }}>
                    {items.icon}
                  </Box>
                )}
                <Link as={'span'} href={items.url} sx={{
                  marginInlineEnd: '0.3rem',
                  whiteSpace: 'nowrap',
                  letterSpacing: '.15px',
                }}>
                  {items.title}
                </Link>
              </Flex>
            )}

            {depthLevel > 0 && window.innerWidth < 960 ? null : depthLevel >
              0 && window.innerWidth > 960 ? (
              <BiRightArrow />
            ) : (
              <BiDownArrow />
            )}
          </Box>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : !items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.title}{" "}
            {depthLevel > 0 ? <BiRightArrow /> : <BiDownArrow />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        <Box
          as={'button'}
          type="button"
          aria-haspopup="menu"
          aria-expanded={dropdown ? "true" : "false"}
          onClick={() => setDropdown((prev) => !prev)}
          sx={{
            color: 'rgba(51, 48, 60, 0.68)'
          }}
        >
          <Flex sx={{
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: '0.4rem',
            position: 'relative',
            paddingBlock: '0.5rem',
            paddingInline: '0.7rem',
            minWidth: "100px"
            // ":hover": {
            //   'opacity': 'calc(.04 * 1)',
            // }
          }}>
            {items.icon && (
              <Box sx={{
                fontSize: '1.375rem',
                marginInlineEnd: '0.625rem',
                blockSize: '1em',
                inlineSize: '1em',
              }}>
                {items.icon}
              </Box>
            )}
            <Link as={'span'} href={items.url} sx={{
              marginInlineEnd: '0.3rem',
              whiteSpace: 'nowrap',
              letterSpacing: '.15px',
            }}>
              {items.title}
            </Link>
          </Flex>
        </Box>
      )
      }
    </Box >
  );
};

export default MenuItems;
