import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { name: /todo app/i })
    expect(heading).toBeInTheDocument()
  })

  it('displays the agentic workflow description', () => {
    render(<Home />)
    const description = screen.getByText(/built with agentic ai development workflow/i)
    expect(description).toBeInTheDocument()
  })

  it('shows the plan build test cycle text', () => {
    render(<Home />)
    const cycleText = screen.getByText(/following the plan → build → test cycle/i)
    expect(cycleText).toBeInTheDocument()
  })

  it('mentions Claude Code', () => {
    render(<Home />)
    const claudeText = screen.getByText(/developed using claude code/i)
    expect(claudeText).toBeInTheDocument()
  })
})
