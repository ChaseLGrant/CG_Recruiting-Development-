-- Seed data for CG Recruiting platform

-- Insert Ultimate Athlete Package
INSERT INTO packages (id, name, description, features, is_active)
VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    'Ultimate Athlete Package',
    'Complete training and recruiting solution for serious athletes',
    '{
        "trainingSessions": 4,
        "metricTracking": true,
        "strengthConditioning": true,
        "recruitingAdvising": true,
        "socialMediaBuilding": true
    }'::jsonb,
    true
)
ON CONFLICT (id) DO NOTHING;

-- Insert pricing for Ultimate Athlete Package ($399/month)
INSERT INTO pricing (package_id, price_amount, currency, billing_period, is_active)
VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    39900, -- $399.00 in cents
    'usd',
    'monthly',
    true
)
ON CONFLICT DO NOTHING;
