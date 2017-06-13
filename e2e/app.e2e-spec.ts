import { NgxOurpalmTablePage } from './app.po';

describe('ngx-ourpalm-table App', () => {
  let page: NgxOurpalmTablePage;

  beforeEach(() => {
    page = new NgxOurpalmTablePage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
