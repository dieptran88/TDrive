import { useRecoilValue, useSetRecoilState } from 'recoil';
import RouterService from '@features/router/services/router-service';
import { RouterState } from '@features/router/state/atoms/router';
import { RouterCompanySelector } from '@features/router/state/selectors/router-selector';
import { useEffect } from 'react';

export default function useRouterCompany() {
  const setClientState = useSetRecoilState(RouterState);
  RouterService.setRecoilState = setClientState;
  const companyId = useRecoilValue(RouterCompanySelector);

  useEffect(() => {
    if (!companyId) setClientState(RouterService.getStateFromRoute());
  }, [companyId]);

  return companyId;
}
