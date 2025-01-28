const Regex = {
  Email: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  Password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/,
};

export type RegexRule = keyof typeof Regex;

export function valueRegex(value: string, validationKey: RegexRule) {
  return Regex[validationKey].test(value);
}
