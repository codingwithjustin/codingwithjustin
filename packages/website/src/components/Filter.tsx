import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Checkbox,
  Stack,
  Text,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React, {createContext, useContext} from 'react';

export const FilterContext = createContext({
  has: (_: string) => false as boolean,
  toggle: (_: string) => {},
});

export const FilterCheckbox: React.FC<{ children: string }> = ({
  children,
}) => {
  const {has, toggle} = useContext(FilterContext);
  return (
    <Checkbox isChecked={has(children)} onChange={() => toggle(children)}>
      {children}
    </Checkbox>
  );
};

export const QueryFilter: React.FC<{ name: string }> = ({name, children}) => {
  const slugify = (property: string) => property.toLocaleLowerCase();

  const key = slugify(name);
  const router = useRouter();
  const value = router.query[key];

  const has = (property: string) => {
    if (!value) return false;
    property = slugify(property);
    return typeof value === 'string' ?
      value === property :
      value.includes(property);
  };

  const toggle = (property: string) => {
    const {query, pathname} = router;

    property = slugify(property);
    if (value == null) {
      query[key] = property;
    } else if (typeof value === 'string') {
      has(property) ? delete query[key] : (query[key] = [value, property]);
    } else {
      router.query[key] = has(property) ?
        value?.filter((s) => s !== property) :
        [...value, property];
    }
    router.push({query, pathname});
  };

  return (
    <AccordionItem>
      <AccordionButton>
        <Text letterSpacing="wide" flex="1" textAlign="left">
          {name}
        </Text>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <FilterContext.Provider value={{has, toggle}}>
          <Stack>{children}</Stack>
        </FilterContext.Provider>
      </AccordionPanel>
    </AccordionItem>
  );
};
