describe('The frontpage', () => {
  it('successfully loads', () => {
    cy.visit('https://vef2-hopaverkefni2-mzss6z0zm-emh33.vercel.app/')
  })
  it('Has a link to the menu"', () => {
    cy.visit('https://vef2-hopaverkefni2-mzss6z0zm-emh33.vercel.app/')
    cy.contains('Matseðill').click()
    cy.url().should('include', '/menu')
  })
  it('Has a link to a login page', () => {
    cy.visit('https://vef2-hopaverkefni2-mzss6z0zm-emh33.vercel.app/')
    cy.contains('Innskráning').click()
    cy.url().should('include', '/admin/login')
  })
  it('Has a cart tracking element', () => {
    cy.visit('https://vef2-hopaverkefni2-mzss6z0zm-emh33.vercel.app/')
    cy.contains('Karfa')
  })
})

describe('The menu', () => {
  it('Has a link back to the frontpage', () => {
    cy.visit('https://vef2-hopaverkefni2-mzss6z0zm-emh33.vercel.app/menu')
    cy.contains('Veitingarstaðurinn Góði').click()
    cy.url().should('eq', 'https://vef2-hopaverkefni2-mzss6z0zm-emh33.vercel.app/')
  })
  it('Let\'s users sort the menu by categories', () => {
    cy.visit('https://vef2-hopaverkefni2-mzss6z0zm-emh33.vercel.app/menu')
    cy.contains('Vegan').click()
    cy.url().should('include', 'categories')
  })
  it('Has buttons to add items to cart', () => {
    cy.visit('https://vef2-hopaverkefni2-mzss6z0zm-emh33.vercel.app/menu')
    cy.get('button').should('have.class', 'menuListItem_addCartButton__03RQy')
  })
})

describe('The Admin page', () => {
  beforeEach(() => {
    cy.request('POST', 'https://vef2-hopaverkefni2-mzss6z0zm-emh33.vercel.app/admin/login', { username: 'admin' , password: '1234567890'})
    .its('body')
  })
  it('Loads if your are logged in', () => {
    cy.visit('https://vef2-hopaverkefni2-mzss6z0zm-emh33.vercel.app/admin')
    cy.contains('Þú ert skráður inn sem admin')
  })
})

