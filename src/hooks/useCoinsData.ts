import { useQuery } from 'react-query';
import { getCoins } from '../api/coingecko';
import { Coin } from '../types/coin';

export const useCoinsData = () => {
  return useQuery<Coin[], Error>('coins', getCoins, {
    refetchInterval: 30000, // 30 saniyede bir güncelle
    staleTime: 10000,
  });
}; 