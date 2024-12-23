import { useQuery } from 'react-query';
import { getCoins } from '../api/coingecko';
import type { Coin } from '../types/coin';

export const useCoins = () => {
  return useQuery<Coin[], Error>('coins', getCoins, {
    refetchInterval: 30000,
    staleTime: 10000,
  });
};