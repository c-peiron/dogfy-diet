import { render, fireEvent, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import AutocompleteSelect from '@/components/AutocompleteSelect.vue'

const options = ['Labrador', 'Poodle', 'Bulldog']

describe('AutocompleteSelect', () => {
  it('muestra lista al enfocar el input', async () => {
    render(AutocompleteSelect, {
      props: {
        options,
        modelValue: '',
      },
    })

    const input = screen.getByPlaceholderText(/Buscar/i)
    await fireEvent.focus(input)

    expect(screen.getByText('Labrador')).toBeInTheDocument()
    expect(screen.getByText('Poodle')).toBeInTheDocument()
  })

  it('filtra los resultados al escribir', async () => {
    render(AutocompleteSelect, {
      props: {
        options,
        modelValue: '',
      },
    })

    const input = screen.getByPlaceholderText(/Buscar/i)
    await fireEvent.focus(input)
    await fireEvent.update(input, 'bul')

    expect(screen.queryByText('Labrador')).not.toBeInTheDocument()
    expect(screen.getByText('Bulldog')).toBeInTheDocument()
  })

  it('selecciona un valor y lo muestra en el input', async () => {
    const model = ref('')

    render(AutocompleteSelect, {
      props: {
        options,
        modelValue: model.value,
        'onUpdate:modelValue': (value: string | undefined) => {
          model.value = value ?? ''
        },
      },
    })

    const input = screen.getByPlaceholderText(/Buscar/i)
    await fireEvent.focus(input)

    const option = await screen.findByText('Poodle')
    await fireEvent.mouseDown(option)

    expect(model.value).toBe('Poodle')
    expect((input as HTMLInputElement).value).toBe('Poodle')
  })

  it('al volver a enfocar muestra texto de búsqueda y no el valor seleccionado', async () => {
    render(AutocompleteSelect, {
      props: {
        options,
        modelValue: 'Labrador',
      },
    })

    const input = screen.getByDisplayValue('Labrador')
    await fireEvent.focus(input)

    expect(input).toHaveValue('')
    expect(screen.getByText('Labrador')).toBeInTheDocument()
  })

  it('usa placeholder personalizado si se proporciona', () => {
    render(AutocompleteSelect, {
      props: {
        options,
        placeholder: 'Selecciona una raza',
      },
    })

    expect(screen.getByPlaceholderText('Selecciona una raza')).toBeInTheDocument()
  })
})
