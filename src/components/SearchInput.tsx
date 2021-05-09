import {
  Icon,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputProps
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { useState } from 'react'

export interface SearchInputProps {
  inputGroup?: InputGroupProps
  input?: InputProps
}

export const SearchInput: React.FC<SearchInputProps> = props => {
  const [search, setSearch] = useState('')
  const router = useRouter()
  const { inputGroup = {}, input = {} } = props
  return (
    <InputGroup {...inputGroup} variant="filled">
      <InputLeftElement pointerEvents="none">
        <Icon as={FaSearch} color="gray.300" />
      </InputLeftElement>
      <Input
        placeholder="Search"
        {...input}
        value={search}
        onChange={e => setSearch(e.target.value)}
        onKeyDown={e => {
          if (e.key !== 'Enter') return
          e.preventDefault()
          router.push(`/search?string=${search}`)
        }}
      />
    </InputGroup>
  )
}
