import React, { useContext, useState } from 'react';
import _ from 'lodash';
import { intlShape, injectIntl, FormattedMessage } from '@edx/frontend-platform/i18n';
import { ensureConfig } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';
import {
  ActionRow,
  Button,
  Container,
  Hyperlink,
  Image,
  TransitionReplace,
} from '@edx/paragon';
import { ExpandLess, ExpandMore, Help } from '@edx/paragon/icons';
import messages from './messages';

ensureConfig([
  'LMS_BASE_URL',
  'MARKETING_SITE_BASE_URL',
  'TERMS_OF_SERVICE_URL',
  'PRIVACY_POLICY_URL',
  'SUPPORT_EMAIL',
  'SITE_NAME',
  'STUDIO_BASE_URL',
  'SHOW_ACCESSIBILITY_PAGE',
], 'Studio Footer component');

const StudioFooter = ({
  // injected
  intl,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { config } = useContext(AppContext);

  return (
    <>
      <div className="m-0 mt-6 row align-items-center justify-content-center">
        <div className="col border-top mr-2" />
        <Button
          data-testid="helpToggleButton"
          variant="outline-primary"
          onClick={() => setIsOpen(!isOpen)}
          iconBefore={Help}
          iconAfter={isOpen ? ExpandLess : ExpandMore}
          size="sm"
        >
          {isOpen ? intl.formatMessage(messages.closeHelpButtonLabel)
            : intl.formatMessage(messages.openHelpButtonLabel)}
        </Button>
        <div className="col border-top ml-2" />
      </div>
      <Container size="xl" className="px-4">
        <TransitionReplace>
          {isOpen ? (
            <ActionRow key="help-link-button-row" className="py-4" data-testid="helpButtonRow">
              <ActionRow.Spacer />
              <Button as="a" href="https://docs.edx.org/" size="sm">
                <FormattedMessage {...messages.edxDocumentationButtonLabel} />
              </Button>
              <Button
                as="a"
                href="https://open.edx.org/"
                size="sm"
                data-testid="openEdXPortalButton"
              >
                <FormattedMessage {...messages.openEdxPortalButtonLabel} />
              </Button>
              <Button
                as="a"
                href="https://www.edx.org/course/edx101-overview-of-creating-an-edx-course#.VO4eaLPF-n1"
                size="sm"
              >
                <FormattedMessage {...messages.edx101ButtonLabel} />
              </Button>
              <Button
                as="a"
                href="https://www.edx.org/course/studiox-creating-a-course-with-edx-studio"
                size="sm"
              >
                <FormattedMessage {...messages.studioXButtonLabel} />
              </Button>
              {!_.isEmpty(config.SUPPORT_EMAIL) && (
                <Button
                  as="a"
                  href={`mailto:${config.SUPPORT_EMAIL}`}
                  size="sm"
                  data-testid="contactUsButton"
                >
                  <FormattedMessage {...messages.contactUsButtonLabel} />
                </Button>
              )}
              <ActionRow.Spacer />
            </ActionRow>
          ) : null}
        </TransitionReplace>
        <ActionRow className="pt-3 m-0 x-small">
          © {new Date().getFullYear()} <Hyperlink destination={config.MARKETING_BASE_URL} target="_blank" className="ml-2">{config.SITE_NAME}</Hyperlink>
          <ActionRow.Spacer />
          {!_.isEmpty(config.TERMS_OF_SERVICE_URL) && (
            <Hyperlink destination={config.TERMS_OF_SERVICE_URL} data-testid="termsOfService">
              {intl.formatMessage(messages.termsOfServiceLinkLabel)}
            </Hyperlink>
          )}{!_.isEmpty(config.PRIVACY_POLICY_URL) && (
            <Hyperlink destination={config.PRIVACY_POLICY_URL} data-testid="privacyPolicy">
              {intl.formatMessage(messages.privacyPolicyLinkLabel)}
            </Hyperlink>
          )}
          {config.SHOW_ACCESSIBILITY_PAGE === 'true' && (
            <Hyperlink
              destination={`${config.STUDIO_BASE_URL}/accessibility`}
              data-testid="accessibilityRequest"
            >
              {intl.formatMessage(messages.accessibilityRequestLinkLabel)}
            </Hyperlink>
          )}
          <Hyperlink destination={config.LMS_BASE_URL}>LMS</Hyperlink>
        </ActionRow>
        <ActionRow className="mt-3 pb-4 x-small">
          {/*
            Site operators: Please do not remove this paragraph! this attributes back to edX and
              makes your acknowledgement of edX's trademarks clear.
            Translators: 'edX' and 'Open edX' are trademarks of 'edX Inc.'. Please do not translate
              any of these trademarks and company names.
          */}
          <FormattedMessage {...messages.trademarkMessage} />
          <Hyperlink className="ml-1" destination="https://www.antiersolutions.com/">Antier</Hyperlink>.
          <ActionRow.Spacer />
          <Hyperlink destination="https://www.antiersolutions.com/" className="float-right">
            <Image
              width="120px"
              alt="Powered by Open edX"
              src="data:image/jpeg;base64,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"
            />
          </Hyperlink>
        </ActionRow>
      </Container>
    </>
  );
};

StudioFooter.propTypes = {
  // injected
  intl: intlShape.isRequired,
};

export default injectIntl(StudioFooter);
