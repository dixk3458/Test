describe('로그인 화면', () => {
  beforeEach(() => {
    cy.visit('/signin');
  });

  it('사용자가 옳바른 아이디와 비밀번호를 입력했을 때 로그인에 성공한다.', () => {
    // API 요청 Mocking
    cy.intercept('GET', '/data/users.json', {
      statusCode: 200, // 응답 상태 코드
      body: [{ id: '1', email: 'jaewoong@naver.com', password: 'jaewoong' }],
    }).as('getUsers');

    // given : 옳바른 이메일과 비밀번호를 입력한 상태
    cy.get('input#email').as('emailInput');
    cy.get('input#password').as('passwordInput');
    cy.contains('button', '로그인').as('submitButton');

    cy.get('@emailInput').type('jaewoong@naver.com');
    cy.get('@passwordInput').type('jaewoong');

    cy.get('@emailInput').invoke('val').should('eq', 'jaewoong@naver.com');
    cy.get('@passwordInput').invoke('val').should('eq', 'jaewoong');

    // when : 클릭
    cy.get('@submitButton').click();

    // then: API 요청이 성공했는지 확인
    cy.wait('@getUsers').its('response.statusCode').should('eq', 200);

    cy.on('window:alert', text => {
      expect(text).to.contains('로그인에 성공했습니다.');
    });

    cy.url().should('include', '/home/1');
    cy.contains('Home').should('be.visible');
  });

  it('사용자가 아이디 혹은 비밀번호를 잘못 입력하면 로그인에 실패한다.', () => {
    cy.intercept('GET', '/data/users.json', {
      statusCode: 200, // 서버는 200 OK로 응답하지만, 유저는 찾을 수 없음
      body: [{}],
    }).as('getUsers');

    cy.get('input#email').as('emailInput');
    cy.get('input#password').as('passwordInput');
    cy.contains('button', '로그인').as('submitButton');

    cy.get('@emailInput').type('wrong@naver.com');
    cy.get('@passwordInput').type('wrong');

    cy.get('@emailInput').invoke('val').should('eq', 'wrong@naver.com');
    cy.get('@passwordInput').invoke('val').should('eq', 'wrong');

    cy.get('@submitButton').click();

    // then
    

    cy.wait('@getUsers').its('response.statusCode').should('eq', 200);

    cy.on('window:alert', text => {
      console.log(text);
      expect(text).to.contains('이메일 또는 비밀번호가 잘못되었습니다.');
    });
  });
});
