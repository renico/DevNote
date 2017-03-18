import { DevNotePage } from './app.po';

describe('dev-note App', function() {
  let page: DevNotePage;

  beforeEach(() => {
    page = new DevNotePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
