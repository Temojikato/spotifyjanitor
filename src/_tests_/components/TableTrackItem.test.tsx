import { render, fireEvent, waitFor } from '@testing-library/react';
import TableTrackItem from '../../components/TableTrackItem';
import { TableContainer, Table, TableBody } from '@mui/material';

describe('TableTrackItem', () => {
  const track = {
    id: '1',
    title: 'Test Song',
    artist: 'Test Artist',
    album: 'Test Album',
    albumArt: 'http://example.com/album.png',
    addedAt: '1/1/2020',
    duration: '3:30',
  };
  const onRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls onRemove when swiped right beyond threshold', async () => {
    const { getByTestId, getByAltText } = render(
      <TableContainer>
        <Table>
          <TableBody>
            <TableTrackItem {...track} onRemove={onRemove} />
          </TableBody>
        </Table>
      </TableContainer>
    );

    const containerDiv = getByTestId('container-div');
    expect(containerDiv).toBeTruthy();

    Object.defineProperty(containerDiv, 'offsetWidth', { configurable: true, value: 300 });

    const img = getByAltText(track.title);
    const motionDiv = img.closest('div');
    expect(motionDiv).toBeTruthy();

    fireEvent.touchStart(motionDiv!, { touches: [{ clientX: 0, clientY: 0 }] });
    fireEvent.touchMove(motionDiv!, { touches: [{ clientX: 200, clientY: 0 }] });
    fireEvent.touchEnd(motionDiv!, { changedTouches: [{ clientX: 200, clientY: 0 }] });

    await waitFor(() => {
      expect(onRemove).toHaveBeenCalledWith(track.id);
    });
  });

  test('does not call onRemove when swiped right below threshold', async () => {
    const { getByTestId, getByAltText } = render(
      <TableContainer>
        <Table>
          <TableBody>
            <TableTrackItem {...track} onRemove={onRemove} />
          </TableBody>
        </Table>
      </TableContainer>
    );

    const containerDiv = getByTestId('container-div');
    expect(containerDiv).toBeTruthy();
    Object.defineProperty(containerDiv, 'offsetWidth', { configurable: true, value: 300 });

    const img = getByAltText(track.title);
    const motionDiv = img.closest('div');
    expect(motionDiv).toBeTruthy();

    fireEvent.touchStart(motionDiv!, { touches: [{ clientX: 0, clientY: 0 }] });
    fireEvent.touchMove(motionDiv!, { touches: [{ clientX: 1, clientY: 0 }] });
    fireEvent.touchEnd(motionDiv!, { changedTouches: [{ clientX: 1, clientY: 0 }] });

    await waitFor(() => {
      expect(onRemove).not.toHaveBeenCalled();
    });
  });
});
