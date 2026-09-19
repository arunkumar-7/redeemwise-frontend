import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import { SelectedCardDisplay } from '../components/app/SelectedCardDisplay';
import { PointsInput } from '../components/app/PointsInput';
import { digitsOnly } from '../utils/pointsInput';
import { QuickAmountChips } from '../components/app/QuickAmountChips';
import { EstimatedValuePreview } from '../components/app/EstimatedValuePreview';
import { useFlow } from '../hooks';
import { validatePoints } from '../utils';

/** `/points` — points entry. Guard: requires a selected card, else redirect to /search (§9.3). */
export default function PointsPage() {
  const { selectedCard, points, confirmPoints } = useFlow();
  const navigate = useNavigate();

  const [rawPoints, setRawPoints] = useState<string>(points !== null ? String(points) : '');
  const [error, setError] = useState<string | null>(null);

  // Route guard: no card in FlowState → back to search.
  if (selectedCard === null) {
    return <Navigate to="/search" replace />;
  }

  const handleSubmit = () => {
    const validation = validatePoints(rawPoints);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }
    confirmPoints(validation.value);
  };

  const handleQuickSelect = (amount: number) => {
    setRawPoints(String(amount));
    setError(null);
  };

  const parsedPoints = rawPoints === '' ? null : Number.parseInt(digitsOnly(rawPoints), 10);
  const showPreview = parsedPoints !== null && Number.isSafeInteger(parsedPoints) && parsedPoints >= 1;

  return (
    <Container width="narrow" className="py-12 lg:py-16">
      <SelectedCardDisplay card={selectedCard} onChangeCard={() => navigate('/search')} />

      <div className="mt-10">
        <SectionHeader
          badgeText="STEP 02"
          titleText="Enter your points"
          subtitleText="Type your current reward balance — no account, no statements, just a number."
        />
      </div>

      <div className="mt-8 flex flex-col gap-6">
        <PointsInput
          value={rawPoints}
          onChange={(value) => {
            setRawPoints(value);
            if (error !== null) setError(null);
          }}
          error={error}
        />

        <QuickAmountChips
          activeAmount={parsedPoints}
          onSelect={handleQuickSelect}
        />

        {showPreview && <EstimatedValuePreview points={parsedPoints} />}

        <Button
          size="large"
          className="w-full sm:w-auto sm:self-start"
          onClick={handleSubmit}
          disabled={rawPoints === ''}
        >
          Find Best Redemption
          <ArrowRight size={18} strokeWidth={2.2} />
        </Button>
      </div>
    </Container>
  );
}
