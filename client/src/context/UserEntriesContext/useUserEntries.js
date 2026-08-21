import { useContext } from 'react';
import UserEntriesContext from './UserEntriesContext';

const useUserEntries = () => useContext(UserEntriesContext);

export default useUserEntries;