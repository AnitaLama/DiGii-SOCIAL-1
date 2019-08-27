import React from 'react';
import {
  ContainerWrapper,
  ContentWrapper
} from '../../Component/StyledComponents';
import { MainWizard } from '../../Component/NeedHelpWizard';

function NeedHelp() {
  return (
    <ContainerWrapper>
      <ContentWrapper>
        <MainWizard />
      </ContentWrapper>
    </ContainerWrapper>
  );
}

export default NeedHelp;
