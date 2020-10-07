import UrlHelper from '@/helpers/UrlHelper';

// eslint-disable-next-line import/prefer-default-export
export const url = (value: string) => UrlHelper.validate(value);
// export const url = (value: string) => !helpers.req(value) || UrlHelper.validate(value);
