const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: '300',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    fontWeight: '400',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  timerText: {
    fontSize: 48,
    fontWeight: '200',
    color: '#333',
    marginBottom: 8,
  },
  phaseText: {
    fontSize: 20,
    color: '#4FC3F7',
    fontWeight: '500',
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleGradient: {
    width: '100%',
    height: '100%',
    borderRadius: CIRCLE_SIZE / 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  resetButton: {
    backgroundColor: '#f5f5f5',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4FC3F7',
  },
  sessionControls: {
    alignItems: 'center',
  },
  sessionLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  sessionButtons: {
    flexDirection: 'column',
    gap: 8,
  },
  sessionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    minWidth: 40,
    alignItems: 'center',
  },
  sessionButtonActive: {
    backgroundColor: '#4FC3F7',
  },
  sessionButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  sessionButtonTextActive: {
    color: '#fff',
  },
  techniqueSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingBottom: 20,
  },
  techniqueButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 247, 0.3)',
  },
  techniqueButtonActive: {
    backgroundColor: '#4FC3F7',
    borderColor: '#4FC3F7',
  },
  techniqueText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  techniqueTextActive: {
    color: '#fff',
  },
});